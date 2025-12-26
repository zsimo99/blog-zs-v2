import CreatePost from "@/components/CreatePost";
import Trends from "@/components/Trends";
import { PostProvider } from "@/context/PostContext";



export default function RootLayout({ children }) {
    return (
        <PostProvider>
            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-6 lg:gap-8">
                    {/* Left Sidebar - Trends */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-[90px]">
                            <Trends />
                        </div>
                    </aside>
                    
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
                            {/* Posts Section */}
                            <main className="flex-1 min-w-0 order-2 xl:order-1">
                                {children}
                            </main>
                            
                            {/* Right Sidebar - Create Post */}
                            <aside className="xl:w-96 flex-shrink-0 order-1 xl:order-2">
                                <div className="xl:sticky xl:top-[90px]">
                                    <CreatePost />
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </PostProvider>
    )
}