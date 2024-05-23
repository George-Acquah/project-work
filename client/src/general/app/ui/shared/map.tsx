"use client";

import {
  useLoadScript,
  Libraries,
  GoogleMap,
  MarkerF,
} from "@react-google-maps/api";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SearchBox from "./searchbox";
import { useLocalState } from "@/utils/hooks/useCookieState";
import { _ITestCenters } from "@/app/lib/dummy-data";
import { RevenueChartSkeleton } from "./skeletons";

interface _IMapComp {
  // setDataBounds: (bounds: string) => void;
  // centers: _IParkingCenter[];
  centers: _ITestCenters[];
  highlighted_id?: string;
  withSearch?: boolean;
}
type _IMapCenter = google.maps.LatLng | google.maps.LatLngLiteral | undefined;
export type _ICoodinates = google.maps.LatLng | google.maps.LatLngLiteral;

const MapComp = ({ centers, highlighted_id, withSearch }: _IMapComp) => {
  const [coordinates, setCoordinates] = useState<_ICoodinates | undefined>({
    lat: 4.9509424,
    lng: -1.7227071,
  });
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selected, setSelected] = useState<_ITestCenters | null>(null);
  // const [selected, setSelected] = useState<_IParkingCenter | null>(null);
  const [viewport, setViewport] = useLocalState<any>("viewport", {
    latitude: 43,
    longitude: -79,
    zoom: 10,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  const libraries: Libraries = useMemo(() => ["places"], []);
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
      zoomControl: false,
      // mapTypeControl: false,
      fullscreenControl: false,
    }),
    []
  );

  const mapRef = useRef<GoogleMap | null>(null);
  const originRef = useRef<any>();
  const destinationRef = useRef<any>();

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING, //TODO might be passed on from the user
    });

    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance?.text ?? "");
    setDuration(results.routes[0].legs[0].duration?.text ?? "");
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const isLoading = !isLoaded && !loadError;

  if (isLoading) {
    return <RevenueChartSkeleton />;
  }

  if (loadError) {
    return <div className="text-red">An Error Occured</div>;
  }

  const CustomMarker = ({ center }: { center: _ITestCenters }) => (
    <MarkerF
      position={{
        lat: center.latitude,
        lng: center.longitude,
      }}
      onClick={(e) => {
        const clickedLatLng = {
          lat: e.latLng?.lat()!,
          lng: e.latLng?.lng()!,
        };
        setSelected(center);
        clickedLatLng && setCoordinates(clickedLatLng);
      }}
    />
  );

  return (
    <div className="">
      <main className="md:flex md:space-x-2 space-y-4 md:space-y-0">
        {withSearch && (
          <div className="md:w-[35%] md:mr-8">
            <SearchBox
              defaultValue=""
              onAddressSelect={(_address, latitude, longitude) => {
                if (latitude && longitude) {
                  setCoordinates({ lat: latitude, lng: longitude });
                }
              }}
            />
          </div>
        )}
        <div className={`${withSearch ? "md:w-[65%]" : "md:w-full"}`}>
          {coordinates && ( // Only render GoogleMap when coordinates are available
            <GoogleMap
              options={mapOptions}
              zoom={15}
              center={coordinates}
              ref={(instance) => (mapRef.current = instance)}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{
                height: "500px",
                width: "100%",
                margin: "50, 50",
                borderRadius: "2px",
              }}
            >
              {/* {coordinates && (
                <Marker
              }}
              onLoad={() => {
                if (mapRef.current) {
                  const center = mapRef.current.props.center;
                  // const bounds = mapRef.current.
                  // setDataBounds(JSON.stringify(bounds));
                  // setCoordinates(center)
                }
              }}
              // onBoundsChanged={() => {
              //   if (mapRef.current) {
              //     const bounds = mapRef.current.getInstance()?.getBounds();
              //     // setDataBounds(JSON.stringify(bounds));
              //     console.log(bounds);
              //   }
              // }}
              // onClick={(e) => {}}
            >
              {/* {centers.map((center) => {
                return (
                  <Marker
                    key={center._id}
                    position={
                      {
                        lat: center.latitude,
                        lng: center.longitude,
                      } as _ICoodinates
                    }
                  >
                    <button
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "30px",
                      }}
                      type="button"
                      onClick={() => {
                        setSelected(center);
                        console.log(center);
                      }}
                    >
                      <Image
                        src={
                          // highlighted_id === center._id
                          // center._id
                          //   ? "/home-color.svg"
                          //   : "/home-solid.svg"
                          "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJsYWNrJTIwb3duZXJ8ZW58MHx8MHx8fDA%3D"
                        }
                        alt="center"
                        className="object-cover w-8 h-8"
                        width={200}
                        height={100}
                      />
                    </button>
                  </Marker>
                );
              })} */}
              {centers.map((center) => (
                <CustomMarker key={center._id} center={center} />
              ))}
            </GoogleMap>
          )}
        </div>
      </main>
    </div>
  );
};

export default MapComp;
