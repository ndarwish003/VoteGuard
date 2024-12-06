from web3 import Web3
import json
import os
from dotenv import load_dotenv

load_dotenv()
private_key = os.getenv("PRIVATE_KEY")

if not private_key:
    print("Private key is undefined. Please check your .env file.")
    exit(1)

# Connect to a local Ethereum blockchain
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

# Load ABI and Bytecode
try:
    with open('./Solidity_output/VoteGuard.abi', 'r') as abi_file:
        abi = json.load(abi_file)

    with open('./Solidity_output/VoteGuard.bin', 'r') as bin_file:
        bytecode = bin_file.read()
        
except FileNotFoundError as e:
    print("ABI or Bytecode file not found:", e)
    exit(1)

print("Bytecode loaded successfully")

if w3.eth.accounts:
    account = w3.eth.accounts[0]
else:
    print("No accounts found in the blockchain. Please create or unlock an account.")
    exit(1)

# Ensure the deploying account has sufficient funds
balance = w3.eth.get_balance(account)
required_gas = 5000000 * w3.to_wei('20', 'gwei')

if balance < required_gas:
    print("Insufficient balance to deploy the contract.")
    exit(1)

# Deploy the contract
try:
    VoteGuard = w3.eth.contract(abi=abi, bytecode=bytecode)

    transaction = VoteGuard.constructor().build_transaction({
        'from': account,
        'nonce': w3.eth.get_transaction_count(account),
        'gas': 5000000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })

    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    print(f"Contract deployed at address: {tx_receipt.contractAddress}")

    # Get contract instance at the deployed address
    contract_instance = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

except Exception as e:
    print("Error deploying the contract:", e)
    exit(1)


# Functions to interact with the contract
def cast_vote(candidate_name):
    try:
        # Get current nonce to avoid duplicate broadcasts
        current_nonce = w3.eth.get_transaction_count(account)

        tx = contract_instance.functions.vote(candidate_name).build_transaction({
            'from': account,
            'nonce': current_nonce,
            'gas': 1000000,
            'gasPrice': w3.to_wei('20', 'gwei')
        })

        signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        print(f"Voted for: {candidate_name}, Transaction hash: {tx_hash.hex()}")
        print(f"\n\nTransaction receipt: {receipt}\n\n")

    except ValueError as e:
        print(f"Failed to cast vote for {candidate_name}: {e}")

    except Exception as e:
        print("An unexpected error occurred while casting vote:", e)

def getVotes():
    try:
        # Fetch votes
        voters, candidates = contract_instance.functions.getVotes().call({
            'from': account
        })
        
        if len(voters) == 0:
            print("No votes have been cast yet.")
        else:
            for i in range(len(voters)):
                print(f"Voter {i+1}: Address = {voters[i]}, Candidate = {candidates[i]}")

    except ValueError as e:
        print("Failed to fetch votes due to a value error:", e)
        
    except Exception as e:
        print("An unexpected error occurred while retrieving votes:", e)

# Example usage
try:
    # Cast a vote for a candidate
    cast_vote("Noor")

    # Retrieve all votes after voting
    getVotes()

except Exception as e:
    print("An error occurred during voting or fetching votes:", e)