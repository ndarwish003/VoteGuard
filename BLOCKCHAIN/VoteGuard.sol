// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteGuard 
{
    struct Vote 
    {
        address voter;
        string candidate;
    }

    Vote[] public votes;
    mapping(address => bool) public hasVoted;
    event VoteCasted(address indexed voter, string candidate);

    function vote(string memory candidate) public 
    {
        require(!hasVoted[msg.sender], "You have already voted.");
        votes.push(Vote(msg.sender, candidate));
        hasVoted[msg.sender] = true;
        emit VoteCasted(msg.sender, candidate);
    }

    // Modified getVotes function
    function getVotes() public view returns (address[] memory, string[] memory) 
    {
        address[] memory voters = new address[](votes.length);
        string[] memory candidates = new string[](votes.length);
        
        for (uint i = 0; i < votes.length; i++) {
            voters[i] = votes[i].voter;
            candidates[i] = votes[i].candidate;
        }
        
        return (voters, candidates);
    }
}