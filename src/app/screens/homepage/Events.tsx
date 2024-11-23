import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import EventService from "../../services/EventService";
import { useEffect } from "react";
import { Event } from "../../../lib/types/event";
import { serverApi } from "../../../lib/config";
import { retrieveeEvents } from "../homepage/selector";
import { setEvents } from "../homepage/slice";

const actionDispatch = (dispatch: Dispatch) => ({
  setEvents: (data: Event[]) => dispatch(setEvents(data)),
});

const eventRetriever = createSelector(retrieveeEvents, (events) => ({
  events,
}));

export default function Events() {
  const dispatch = useDispatch();
  const { setEvents } = actionDispatch(dispatch);
  const { events } = useSelector(eventRetriever);

  useEffect(() => {
    // Data fetch
    const eventService = new EventService();

    eventService
      .getEvents()
      .then((data) => {
        console.log("data: ", data);
        setEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Events</span>
        </Box>

        {events.length !== 0 ? (
          <>
            <Swiper
              className={"events-info swiper-wrapper"}
              slidesPerView={"auto"}
              centeredSlides={true}
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={30}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
            >
              {events.map((event: Event) => (
                <SwiperSlide key={event._id} className={"events-info-frame"}>
                  <div className={"events-img"}>
                    <img
                      src={`${serverApi}/${event.eventImages[0]}`}
                      className={"events-img"}
                      alt={event.eventName}
                    />
                  </div>
                  <Box className={"events-desc"}>
                    <Box className={"events-bott"}>
                      <Box className={"bott-left"}>
                        <div className={"event-title-speaker"}>
                          <strong>{event.eventName}</strong>
                          <div className={"event-organizator"}>
                            <img src={"/icons/speaker.svg"} alt="speaker" />
                            <p className={"spec-text-author"}>
                              {event.eventTopic}
                            </p>
                          </div>
                        </div>

                        <p className={"text-desc"}>{event.eventDesc}</p>

                        <div className={"bott-info"}>
                          <div className={"bott-info-main"}>
                            <img src={"/icons/calendar.svg"} alt="calendar" />
                            {new Date(
                              event.createdAt
                            ).toLocaleDateString()}{" "}
                            {/* Format date as needed */}
                          </div>
                          <div className={"bott-info-main"}>
                            <img src={"/icons/location.svg"} alt="location" />
                            {event.eventLocation}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Box className={"prev-next-frame"}>
              <img
                src={"/icons/arrow-right.svg"}
                className={"swiper-button-prev"}
                alt="previous"
              />
              <div className={"dot-frame-pagination swiper-pagination"}></div>
              <img
                src={"/icons/arrow-right.svg"}
                className={"swiper-button-next"}
                style={{ transform: "rotate(-180deg)" }}
                alt="next"
              />
            </Box>
          </>
        ) : (
          <Box className="no-events-now">
            Events are not available currently!
          </Box>
        )}
      </Stack>
    </div>
  );
}
