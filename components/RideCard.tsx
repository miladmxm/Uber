import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import { Image, Text, View } from "react-native";

const RideCard = ({
  ride: {
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col justify-center items-center p-3">
        <View className="flex flex-row justify-between items-center">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text numberOfLines={1} className="text-md font-Jakarta">
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text numberOfLines={1} className="text-md font-Jakarta">
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {formatDate(created_at)},{formatTime(ride_time)}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {driver.first_name}
              {driver.last_name}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {driver.car_seats}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-md capitalize font-JakartaMedium ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;