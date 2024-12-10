
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

# Ensure Web3 is connected
if not w3.is_connected():
    print("Failed to connect to the Ethereum node.")
    exit(1)

# Load ABI and Bytecode
try:
    with open('./BLOCKCHAIN/Solidity_contract/VoteGuard.abi', 'r') as abi_file:
        abi = json.load(abi_file)
    with open('./BLOCKCHAIN/Solidity_contract/VoteGuard.bin', 'r') as bin_file:
        bytecode = bin_file.read().strip()

except FileNotFoundError as e:
    print("ABI or Bytecode file not found:", e)
    exit(1)

print("Bytecode loaded successfully\n")

if w3.eth.accounts:
    account = w3.eth.accounts[0]
else:
    print("No accounts found in the blockchain. Please create or unlock an account.")
    exit(1)

balance = w3.eth.get_balance(account)
required_gas = 5000000 * w3.to_wei('20', 'gwei')

if balance < required_gas:
    print("Insufficient balance to deploy the contract.")
    exit(1)

try:
    VoteGuard = w3.eth.contract(abi=abi, bytecode=bytecode)

    gas_estimate = VoteGuard.constructor().estimate_gas({
        'from': account,
        'gasPrice': w3.to_wei('20', 'gwei')
    })

    transaction = VoteGuard.constructor().build_transaction({
        'from': account,
        'nonce': w3.eth.get_transaction_count(account),
        'gas': gas_estimate,
        'gasPrice': w3.to_wei('20', 'gwei')
    })

    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    contract_address = tx_receipt.contractAddress
    print("Contract deployed at address:", contract_address)

    contract_instance = w3.eth.contract(address=contract_address, abi=abi)

except Exception as e:
    print(f"An error occurred while deploying the contract: {e}")
    exit(1)


def cast_vote(candidate_name):
    try:
        current_nonce = w3.eth.get_transaction_count(account)

        tx = contract_instance.functions.castVote(candidate_name).build_transaction({
            'from': account,
            'nonce': current_nonce,
            'gas': 1000000,
            'gasPrice': w3.to_wei('20', 'gwei')
        })

        signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        if receipt['status'] == 1:
            print(f"Vote cast successfully for {candidate_name}. Transaction hash: {tx_hash.hex()}")
        else:
            print(f"Transaction failed. Check the transaction hash: {tx_hash.hex()}")

    except ValueError as e:
        print(f"Failed to cast vote for {candidate_name}: {e}")

    except Exception as e:
        print("An unexpected error occurred while casting vote:", e)

def get_votes():
    try:
        voters, candidates = contract_instance.functions.getVotes().call()

        print("\n\nAll Votes:")

        for i in range(len(voters)):
            candidate_name = candidates[i].decode('utf-8').rstrip('\x00')
            print(f"Voter: {voters[i]}, Candidate: {candidate_name}")

    except Exception as e:
        print("An error occurred while retrieving votes:", e)