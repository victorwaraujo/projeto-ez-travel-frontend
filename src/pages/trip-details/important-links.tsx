import { Link, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Link {
    id: string;
    title: string;
    url: string;
}

export function ImportantLinks() {
    const { tripId } = useParams();
    const [links, setLinks] = useState<Link[]>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links));
    }, [tripId]);

    return (

        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            {links.length > 0 ? (
                links.map(link => (
                    <div key={link.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">{link.title}</span>
                            <a 
                                href={link.url} 
                                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {link.url}
                            </a>
                        </div>
                        <Link2 className="text-zinc-400 size-5 shrink-0" />
                    </div>
                ))
            ) : (
                <p className="text-zinc-500 text-sm">Nenhum link encontrado.</p>
            )}
        </div>
    );
}


