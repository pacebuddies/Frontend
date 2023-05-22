import pacebuddiesApi from "../../instances/axiosConfigured";
import { INotification } from "../../internalTypes/interfaces"
import { UserPlusIcon, HandThumbUpIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface IProps {
    data: INotification,
    markAsSeen: (arg: string) => void
}

const NotificationSegment= ({ data, markAsSeen }: IProps) => {

    function parseDate(dateStr: string) {
        const date = new Date(dateStr)
        const day = ("0"+date.getDate()).slice(-2)
        const monthNum = date.getMonth() + 1
        const month = ("0" + monthNum).slice(-2)
        const year = date.getFullYear()
        const hours = ("0"+date.getHours()).slice(-2)
        const minutes = ("0"+date.getMinutes()).slice(-2)
        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    return (
        <div className="flex w-full border-pb-green border-2 px-2 py-2.5 my-1 relative items-center justify-center"
            onClick={() => {
                if(!data.seen) {
                    markAsSeen(data.id)
                }   
            }}    
            >
            {!data.seen && (
                <ExclamationCircleIcon className="h-6 w-6 absolute top-0.5 left-0.5 text-pb-orange rounded-full stroke-white"/>
            )}
            {(data.action == "REQUEST_MATCH" || data.action == "ACCEPT_MATCH") && (
                <UserPlusIcon className="flex shrink-0 h-8 w-8 px-1 mr-3 rounded-full text-white bg-gradient-to-r from-pb-green to-pb-dark-green"/>
            )}
            
            {(data.action == "UPVOTE") && (
                <HandThumbUpIcon className="flex shrink-0 h-8 w-8 px-1 mr-3 rounded-full text-white bg-gradient-to-r from-pb-green to-pb-dark-green"/>
            )}
            <div className="w-full flex-column">
                <div className="flex justify-between text-sm">
                    <div className="text-pb-green">{data.title}</div>
                    <div>{parseDate(data.date_time)}</div>
                </div>
                <div className="font-sans text-sm">
                    {data.content}
                </div>
                <div>
                    {/* {data.action == "REQUEST_MATCH" && (<div>XD</div>)} */}
                </div>
            </div> 
        </div>
    )
}

export default NotificationSegment