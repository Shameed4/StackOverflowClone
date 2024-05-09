import { useState, useEffect } from "react"
import { getRating, getUserVote, toggleUserDownvote, toggleUserUpvote } from "../../request-functions/request-functions";

export default function Vote({ type, obj }) {
    const [ userRated, setUserRated ] = useState(0); // -1 if downvoted, 0 if unrated, 1 if upvoted
    const [ totalRated, setTotalRated ] = useState(0);

    async function fetchData() {
        try {
            const rating = await getRating(type, obj);
            setTotalRated(rating);
            const userVote = await getUserVote(type, obj);
            console.log("User vote:", userVote);
            setUserRated(userVote);
        } catch (error) {
            console.error("Error fetching rating:", error);
        }
    }

    const upvoteClick = () => {
        toggleUserUpvote(type, obj);
        fetchData();
    }

    const downvoteClick = () => {
        toggleUserDownvote(type, obj);
        fetchData();
    }
    
    useEffect(() => {
        fetchData();
    });

    return (
    <>
        <button onClick={upvoteClick}>Upvote</button>
        <span>{totalRated}</span>
        <button onClick={downvoteClick}>Downvote</button>
    </>
    )
}