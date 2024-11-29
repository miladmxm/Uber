import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import {
  Animated,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useRef, useState } from "react";
import axios from "axios";
const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  resultStyle,
  handlePress,
}: GoogleInputProps) => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchResponse, setSearchResponse] = useState<[]>([]);
  const [searchResultTop, setSearchResultTop] = useState<number>(100);
  const timeOutForSearch = useRef<any>();
  const handleChangeSearchInput = (value: string) => {
    clearTimeout(timeOutForSearch.current);
    setSearchInputValue(value);
    timeOutForSearch.current = setTimeout(() => handleSearchPlace(value), 2000);
  };
  const handleSearchPlace = async (searchValue: string) => {
    if (searchValue.length <= 1) {
      setSearchResponse([]);
      return;
    }
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search?format=json&accept-language=en",
        {
          params: { q: searchValue },
          headers: {
            Accept: "*",
            "content-type": "application/json",
            "User-Agent": "axios/1.7.2",
          },
        }
      );
      console.log(res.data);
      setSearchResponse(res.data);
    } catch (err) {
      console.debug(err);
    }
  };
  return (
    <>
      {searchResponse.length > 0 && (
        <Animated.FlatList
          className={`max-h-[350px] w-full left-5 absolute z-50 bg-white rounded-b-xl rounded-t translate-y-2`}
          contentContainerClassName="p-6"
          style={{
            top: searchResultTop,
            ...resultStyle,
          }}
          renderItem={({
            item,
          }: {
            item: {
              lat: string;
              lon: string;
              display_name: string;
              name: string;
            };
          }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSearchInputValue("");
                  setSearchResponse([]);
                  handlePress({
                    latitude: Number(item.lat),
                    longitude: Number(item.lon),
                    address: item.name,
                  });
                }}
              >
                <View className="bg-gray-100/60 border border-gray-300 p-1 rounded-lg w-full mb-3">
                  <Text>{item["display_name"]}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
          data={searchResponse}
        />
      )}
      <View
        onLayout={(event) => {
          event.target.measure((x, y, width, height, pageX, pageY) => {
            setSearchResultTop(pageY + height);
          });
        }}
        className={`flex flex-row items-center justify-center rounded-xl ${containerStyle} mb-5`}
      >
        <View className="w-full h-14 flex flex-row ">
          <View className="w-14 h-full flex items-center justify-center">
            <Image
              source={icon ? icon : icons.search}
              className="h-8 w-8"
              resizeMode="contain"
            />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <TextInput
              placeholder={initialLocation ?? "Where do you want to go?"}
              onChangeText={handleChangeSearchInput}
              value={searchInputValue}
              className="px-2 flex-auto h-14"
            />
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => {
              setSearchInputValue("");
              clearTimeout(timeOutForSearch.current);
              setSearchResponse([]);
            }}
            className="w-10 h-full items-center justify-center"
          >
            <Image
              source={icons.close}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        {/* <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where you want go?"
        debounce={200}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat,
            longitude: details?.geometry.location.lng,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
      /> */}
      </View>
    </>
  );
};
export default GoogleTextInput;
