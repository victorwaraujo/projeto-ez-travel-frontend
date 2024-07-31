import { Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface UpdateTripsProps {
    trip: Trip | undefined;
    closeUpdateDateModal: () => void;
    setTrip: (trip: Trip) => void;
}

export function UpdateTrip({
    trip,
    closeUpdateDateModal, 
    setTrip
}:UpdateTripsProps) {
  const [destination, setDestination] = useState(trip?.destination || '');
  const [evenStartAndEndDates, setEvenStartAndEndDates] = useState<DateRange | undefined>({
    from: new Date(trip?.starts_at || ''),
    to: new Date(trip?.ends_at || ''),
  });
  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayedDate = evenStartAndEndDates && evenStartAndEndDates.from && evenStartAndEndDates.to
   ? format(evenStartAndEndDates.from, "d' de 'LLL", { locale: ptBR }).concat(' até ').concat(format(evenStartAndEndDates.to, "d' de 'LLL", { locale: ptBR }))
   : null

  async function handleSave() {
    if (trip) {
      const updatedTrip = {
        ...trip,
        destination,
        starts_at: evenStartAndEndDates?.from?.toISOString() || trip.starts_at,
        ends_at: evenStartAndEndDates?.to?.toISOString() || trip.ends_at,
      };
      await api.put(`/trips/${trip.id}`, updatedTrip)
      setTrip(updatedTrip);
      closeUpdateDateModal();
    }
  }
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Alterar Local e Data</h2>
              <button type='button' onClick={closeUpdateDateModal}>
                <X className='size-5 text-zinc-400' />
              </button>
            </div>
          </div>

          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400'/>
              <input 
                type="text" 
                placeholder="Para onde você vai?" 
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                value={destination}
                onChange={event => setDestination(event.target.value)}
              />
            </div>

            <button onClick={openDatePicker} className='flex items-center gap-2 text-left w-[240px]'>
              <Calendar className='size-5 text-zinc-400'/>
              <span className="text-lg text-zinc-400 w-40 flex-1">
                {displayedDate || 'Quando?'}
              </span>
            </button>
              
            {isDatePickerOpen &&(
              <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-lg font-semibold'>Selecione a data</h2>
                      <button type='button' onClick={closeDatePicker}>
                        <X className='size-5 text-zinc-400' />
                      </button>
                    </div>
                  </div>

                  <DayPicker mode="range" selected={evenStartAndEndDates} onSelect={setEvenStartAndEndDates}/>
                </div>
              </div>
            )}

            <div className='w-px h-6 bg-zinc-800'/>

            <Button onClick={handleSave} variant='primary'>
              Salvar
              <Settings2 className='size-5'/>
            </Button>
            
          </div>
          {/* <span className=" text-lime-300 text-sm flex justify-center">Se você alterar as datas as atividades salvas serão perdidas.</span> */}
        </div>
      </div>
        
    )
}