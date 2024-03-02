import { Separator } from "@/src/components/ui/separator"
import { useEffect, useState } from "react"

type post = {
    name: string
    icon: string
    content: string
    date: string
    url: string
}

const nitterAPI = "https://nitter.privacydev.net/amex2189/rss"

export function Timeline() {
    const [posts, setPosts] = useState<post[]>([{
        name: "ame_x",
        icon: "https://avatars.githubusercontent.com/u/101631052?v=4",
        content: "Loading...",
        date: new Date().toString(),
        url: "https://twitter.com/amex2189"
    }])

    useEffect(() => {
        fetch("/api/proxy?url=" + encodeURIComponent(nitterAPI))
            .then((response) => response.text())
            .then((text) => {
                if (localStorage.getItem("_cache_timeline") !== null) {
                    const object = JSON.parse(localStorage._cache_timeline);
                    if (object.date + 12 * 60 * 60 * 1000 > Date.now()) {
                        console.log("%c[Cache] Use cache", "color: #bada55; font-weight: bold;");
                        setPosts(object.value)
                        return
                    }
                }

                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "text/xml");

                const name = doc.querySelector("image > title")?.textContent;
                const icon = doc.querySelector("image > url")?.textContent;
                const posts = doc.querySelectorAll("item");

                const postArray = (Array.from(posts).map((post) => {
                    return {
                        name: name ?? "ame_x",
                        icon: icon ?? "https://avatars.githubusercontent.com/u/121654029?v=4",
                        content: post.querySelector("description")?.textContent ?? "Faild to load",
                        date: post.querySelector("pubDate")?.textContent ?? "Faild to load",
                        url: post.querySelector("link")?.textContent ?? "Faild to load",
                    }
                }))

                localStorage.setItem("_cache_timeline", JSON.stringify(
                    {
                        value: postArray,
                        date: Date.now()
                    }
                ))

                setPosts(postArray)
            })
        }, [])

    return (
        <div className="w-full px-5">
            {
                posts.map((post) => (
                    <TimelinePost
                        name={post.name}
                        icon={post.icon}
                        content={post.content}
                        date={post.date}
                        url={post.url}
                    />
                ))
            }
        </div>
    );
}

function TimelinePost({ name, icon, content, date, url }: post) {
    return (
        <div className="w-full" onClick={() => window.open(url, "_blank")}>
            <TimelinePostHeader
                name={name}
                icon={icon}
                date={date}
            />
            <TimelinePostContent
                content={content}
            />
            <Separator className="my-2" />
        </div>
    );
}

function TimelinePostHeader({ name, icon, date }: {
    name: string
    icon: string
    date: string
}) {
    return (
        <div className="w-full flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                    src={icon}
                    alt={name}
                    className="w-full h-full object-cover"  
                />
            </div>
            <div className="ml-4">
                <div className="text-sm text-gray-400">{name}</div>
                <div className="text-sm text-gray-400">{date}</div>
            </div>
        </div>
    );
}

function TimelinePostContent({ content }: {
    content: string
}) {
    return (
        <div className="w-full mt-1" dangerouslySetInnerHTML={{ __html: content }}></div>
    );
}