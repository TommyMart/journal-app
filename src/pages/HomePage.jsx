import EntryForm from "../components/EntryForm";
import LatestXPosts from "../components/LatestXPosts";


export default function HomePage() {

    return(
        <>
            <h1>Journal Home Page</h1>

            <EntryForm />
            <LatestXPosts limit={3} />
        
        </>
    )
}