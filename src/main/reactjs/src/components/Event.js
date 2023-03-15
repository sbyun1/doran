import '../resources/css/event.css'
import {useEffect, useState} from "react";
import axios from "axios";

function Event() {
    const [eventItems, setEventItems] = useState([]);

    useEffect(() => {
        // 테스트 데이터
        const data = [{
            eventId: 1,
            eventTitle: '이벤트1',
            eventStatus: '진행중',
            eventStartDate: '2023-00-00',
            eventEndDate: '2023-00-00',
            eventImg: 'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png'
        }, {
            eventId: 2,
            eventTitle: '이벤트2',
            eventStatus: '진행중',
            eventStartDate: '2023-00-00',
            eventEndDate: '2023-00-00',
            eventImg: 'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png'
        }, {
            eventId: 3,
            eventTitle: '이벤트3',
            eventStatus: '진행중',
            eventStartDate: '2023-00-00',
            eventEndDate: '2023-00-00',
            eventImg: 'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png'
        }, {
            eventId: 4,
            eventTitle: '이벤트4',
            eventStatus: '진행중',
            eventStartDate: '2023-00-00',
            eventEndDate: '2023-00-00',
            eventImg: 'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png'
        }, {
            eventId: 5,
            eventTitle: '이벤트5',
            eventStatus: '종료',
            eventStartDate: '2023-00-00',
            eventEndDate: '2023-00-00',
            eventImg: 'https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png'
        }];

        setEventItems(data);
    }, []);

    return <div className="main-container">
        <div className="event-top">
            <span>Event</span>
        </div>
        <div className="event-list">
            {
                eventItems.map(eventItem => {
                    return <EventItem key={eventItem.eventId} data-key={eventItem.eventId}
                                      eventItem={eventItem}></EventItem>
                })
            }
        </div>
    </div>
}

function EventItem({eventItem}) {
    return (
        <div className="event-figure">
            <div className="event-image">
                <img src={eventItem.eventImg} alt=""/>
            </div>
            <div className="event-info">
                <span className="event-status end">{eventItem.eventStatus}</span>
                <span className="event-title">{eventItem.eventTitle}</span>
                <span className="evnet-term">기간: {eventItem.eventStartDate} ~ {eventItem.eventEndDate}</span>
            </div>
        </div>
    )
}

export default Event;


