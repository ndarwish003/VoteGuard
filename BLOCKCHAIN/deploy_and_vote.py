from web3 import Web3
import json

# Connect to a local Ethereum blockchain
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

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

try:
    # Deploy the contract
    VoteGuard = w3.eth.contract(abi=abi, bytecode=bytecode)
    account = w3.eth.accounts[0]
    transaction = VoteGuard.constructor().build_transaction({
        'from': account,
        'nonce': w3.eth.get_transaction_count(account),
        'gas': 5000000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })

    # Sign and send the transaction
    # Note: private key won't be hardcoded in both the prototype and implementation of the project. This is just a basic draft
    private_key = ""
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
        tx = contract_instance.functions.vote(candidate_name).build_transaction({
            'from': account,
            'nonce': w3.eth.get_transaction_count(account),
            'gas': 100000,
            'gasPrice': w3.to_wei('20', 'gwei')
        })

        signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        print(f"Voted for: {candidate_name}, Transaction hash: {tx_hash.hex()}")

    except ValueError as e:
        print(f"Failed to cast vote for {candidate_name}: {e}")
    except Exception as e:
        print("An unexpected error occurred while casting vote:", e)


def get_all_votes():
    try:
        # Fetch the votes
        voters, candidates = contract_instance.functions.getVotes().call()
        
        for i in range(len(voters)):
            print(f"Voter {i+1}: Address = {voters[i]}, Candidate = {candidates[i]}")

    except Exception as e:
        print("Error retrieving votes:", e)


# Example usage
try:
    cast_vote("Noor")
    get_all_votes()

except Exception as e:
    print("An error occurred during voting or fetching votes:", e)