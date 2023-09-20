import CreatePost from "@/components/CreatePost";
import Trends from "@/components/Trends";
import { PostProvider } from "@/context/PostContext";



export default function RootLayout({ children }) {
    return (
        <PostProvider>
            <div className="md:flex gap-8 relative top-[65px] container mx-auto px-4">
                <div className="max-lg:hidden basis-2/5 lg:basis-1/5 flex-1  ">
                    <Trends />
                </div>
                <div className="lg:basis-4/5 flex-1 gap-8 flex flex-col-reverse xl:flex-row  ">
                    <div className="basis-8/12 flex-1 ">
                        {children}
                    </div>
                    <div className="basis-4/12 flex-1 ">
                        <CreatePost />
                    </div>
                </div>
            </div>
        </PostProvider>
    )
}