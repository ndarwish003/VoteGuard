// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteGuard {
    struct Vote {
        address voter;
        string candidate;
    }

    mapping(address => string) public votes; // Mapping of voter address to their chosen candidate
    address[] public voterList;             // List of all voters to enable enumeration

    function castVote(string memory candidate) public {
        require(bytes(candidate).length > 0, "Candidate name cannot be empty");
        require(bytes(votes[msg.sender]).length == 0, "You have already voted");

        // Record the vote
        votes[msg.sender] = candidate;
        voterList.push(msg.sender); // Keep track of voter addresses
    }

   function getVotes() public view returns (address[] memory, bytes32[] memory) {
        uint256 voteCount = voterList.length; // Get the number of votes
        address[] memory voters = new address[](voteCount);
        bytes32[] memory candidates = new bytes32[](voteCount);

        for (uint256 i = 0; i < voteCount; i++) {
            address voter = voterList[i];
            voters[i] = voter;
            candidates[i] = bytes32(bytes(votes[voter])); // Store as bytes32
        }

        return (voters, candidates);
    }


    function getVoteCount() public view returns (uint256) {
        return voterList.length;
    }
}