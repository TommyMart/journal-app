import { useEffect, useState } from "react";
import { useJournalEntriesData } from "../contexts/EntriesContext";
import JournalEntryContainer from "./JournalEntryContainer";


export default function LatestXPosts({limit}){
    let journalEntries = useJournalEntriesData();

    let [sortedAndTrimmedPostList, setProcessedPostList] = useState([]);
     
    useEffect(() => {
        // Detect any changes to the context data of journal entries
        // And process the context data into a sorted and trimmed post list
        let tempListCopy = [...journalEntries];

        tempListCopy.sort((a, b) => {
            if (a.lastEdited < b.lastEdited) {
                return -1;
            } else if (a.lastEdited > b.lastEdited) {
                return 1;
            } else {
                return 0;
            }
        });

        tempListCopy.reverse(); // swap 1 and -1 for more performant reverse

        if (limit && limit > 0 && tempListCopy.length > limit) {
            // Cuts the array down to a size if it's above that size
            tempListCopy.length = limit;
        }

        setProcessedPostList(tempListCopy)

    }, [journalEntries]);

    return (
        <>
        {sortedAndTrimmedPostList.map((entry) => {
            return <JournalEntryContainer entryId={entry.id} />
        })}
        </>
    )
}