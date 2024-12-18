VoteGuard - Secure E-Voting System



Overview
VoteGuard is a secure, web-based E-voting system designed for academic institutions (i.e., Kuwait University). The platform utilizes blockchain technology for secure voting, ensuring transparency and integrity. It features a React frontend, Flask backend, and a private Ethereum blockchain using Ganache for transaction management.



Prerequisites

(1) Node.js (version 22.12.0) for running the React frontend.

(2) Python3 for running the Flask app.

(3) Ganache for the private Ethereum blockchain.



Make sure all required dependencies are installed. Follow the installation instructions below to set up the environment.



(1) Clone the repository: git clone https://github.com/ndarwish003/VoteGuard.git + cd VoteGuard


(2) Frontend Setup (React):

    - Ensure you're using Node.js version 22.12.0 (the latest version). You can use nvm to install and manage the version: nvm install 22.12.0 && nvm use 22.12.0

    - Navigate to the React App: cd VoteGuard_ReactApp

    - Install the necessary dependencies: npm install

    - Run the React App: npm run dev


(3) Backend Setup

    - Install Python 3: sudo apt update && sudo apt install python3

    - Verify installation: python3 --version

    - Install pip: python3 -m ensurepip --upgrade

    - Install Flask: pip install Flask

    - Install web3.py: pip install web3


(4) Ethereum Private Blockchain Setup (Ganache)

    - Install Ganache CLI: npm install -g ganache-cli

    - Start Ganache by running 'ganache'

    - Copy the private key of the first account (at index [0]) from Ganache and add it to the .env file under the PRIVATE_KEY variable.  This will allow your application to interact with the private blockchain using that account.


(5) Running the Full Stack

    - First, run Ganache and copy the private key of account[0] to the .env file.
    Ganache will now be running and accessible at http://127.0.0.1:8545.

    - Then, navigate to the 'backend' directory and start the flask app: cd backend && python3 flask_app.py
    The Flask backend will now be running and accessible at http://localhost:5000.

    - Finally, run the React App: npm run dev
    The frontend will now be running locally and accessible at http://localhost:3000.