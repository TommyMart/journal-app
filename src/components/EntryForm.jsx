import { useState } from "react";
import { useJournalEntriesData, useJournalEntriesSetter } from "../contexts/EntriesContext";
import HomePage from "../pages/HomePage";
import { useEffect } from "react";


// <HomePage>
//     <EntryForm />
//     <LatestPosts limit={5} />
// <HomePage />

// <JournalEntriesContainer >
//     Toggle between <EntryForm /> and <ViewForm />
    // <EntryForm entryId={23154265324} />
// </JournalEntriesContainer>


export default function EntryForm({entryId}) {
    let useJournalEntriesData = useJournalEntriesData();
    let setJournalEntries = useJournalEntriesSetter();

    let [localId, setLocalId] = useState(entryId ? entryId.toString() : null); 
    let [localType, setLocalType] = useState("journal");
    let [localName, setLocalName] = useState("Default Post Name");
    let [localContent, setLocalContent] = useState("Write your journal entry here.");
    let [localAuthor, setLocalAuthor] = useState("Author");

    useEffect(() => {
        if (localId){
            let specificPost = journalEntriesData.find((entry) => entry.id == localId);

            setLocalAuthor(specificPost.author);
            setLocalContent(specificPost.content);
            setLocalName(specificPost.name);
            setLocalType(specificPost.type);
        }
        
    }, [localId]);

    const handleSubmission = () => {
        setJournalEntries(currentJournalEntries => {

            

            if (localid) {
                // if ID exists we are editing
                let tempEntriesCopy = [...currentJournalEntries];
                tempEntriesCopy.forEach((entry, index) => {
                    if (entry.id == localId){
                        tempEntriesCopy[index] = {
                            lastEdited: Date.now(),
                            author: localAuthor,
                            content: localContent,
                            name: localName,
                            type: localType,
                            id: localId ? localId : crypto.randomUUID()
                        }
                    }
                })
                return tempEntriesCopy;
            } else {
                // else we are creating
                let newEntry = {
                    lastEdited: Date.now(),
                    author: localAuthor,
                    content: localContent,
                    name: localName,
                    type: localType,
                    id: localId ? localId : crypto.randomUUID()
                }
            }
            

            // let someNewArray = currentJournalEntries;
            // someNewArray.push(newEntry);
            // return someNewArray;

            return [...currentJournalEntries, newEntry];

        })
    }


    return(
        <>
            <label htmlFor="localName">Entry Title:</label>
            <input 
                type="text" 
                name="localName" 
                value={localName} 
                onChange={(event) => setLocalName(event.target.value)}
            />
            <label htmlFor="localAuthor">Entry Title:</label>
            <input 
                type="text" 
                name="localAuthor" 
                value={localAuthor} 
                onChange={(event) => setLocalAuthor(event.target.value)}
            />
            <label htmlFor="localContent">Entry Title:</label>
            <input 
                type="text" 
                name="localContent" 
                value={"localContent"} 
                onChange={(event) => setLocalContent(event.target.value)}
            />
            <label htmlFor="localType">Entry Title:</label>
            <input 
                type="text" 
                name="localType" 
                value={localType} 
                onChange={(event) => setLocalType(event.target.value)}
            />


            <button onClick={handleSubmission}> 
                Submit new entry
            </button>
            
        </>
    )
}