import { Plus} from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { CreateLinkModal } from "./create-link-modal";
import { Button } from "../../components/button";
import { InviteGuestsModal } from "./send-emails-guests"
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

// interface Participants {
//     id: string
//     name: string | null
//     email: string 
//     is_confirmed: boolean
// }

export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
    const { tripId } = useParams();
    // const [participants, setParticipants] = useState<Participants[]>([]);

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false)
    }   


    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true)
    }

    function closeCreateLinkModal() {
        setIsCreateLinkModalOpen(false)
    } 

    function openGuestsModal() {
        setIsGuestsModalOpen(true);
    }

    function closeGuestsModal() {
        setIsGuestsModalOpen(false);
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if (!email) {
            return;
        }

        if (emailsToInvite.includes(email)) {
            return;
        }

        setEmailsToInvite([
            ...emailsToInvite,
            email
        ]);

        event.currentTarget.reset();
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

        setEmailsToInvite(newEmailList);
    }

    async function handleInviteGuests() {
        console.log("Inviting guests with emails:", emailsToInvite);
        await api.post(`/trips/${tripId}/invites`, { emails: emailsToInvite });
        api.get(`/trips/${tripId}/participants`).then(() => {
        // setParticipants(response.data.participants)
        setEmailsToInvite([])
        setIsGuestsModalOpen(false)
        })  

        window.document.location.reload()
    }

    
    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader/>

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <Button onClick={openCreateActivityModal}>
                            <Plus className='size-5' />
                            Cadastrar atividade
                        </Button>
                    </div>

                    <Activities />
                </div>

                <div className="w-80 space-y-6">

                    
                    <ImportantLinks />
                    <Button onClick={openCreateLinkModal} variant='secondary' size="full">
                        <Plus className='size-5'/>
                        Cadastrar novo link
                    </Button>
                    <div className='w-full h-px bg-zinc-800' />
                    <Guests openGuestsModal={openGuestsModal}  />
                    

                </div>
            </main>


            {isCreateActivityModalOpen && (
                <CreateActivityModal 
                    closeCreateActivityModal={closeCreateActivityModal}
                />
            )}

            {isCreateLinkModalOpen && (
                <CreateLinkModal 
                    closeCreateLinkModal={closeCreateLinkModal}
                 />
            )}

            {isGuestsModalOpen && (
                <InviteGuestsModal
                    emailsToInvite={emailsToInvite}
                    addNewEmailToInvite={addNewEmailToInvite}
                    closeGuestsModal={closeGuestsModal}
                    removeEmailFromInvites={removeEmailFromInvites}
                    handleInviteGuests={handleInviteGuests}
                />
            )}

            

            
        </div>
    )
}