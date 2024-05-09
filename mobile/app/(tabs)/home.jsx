import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MediaCard from "../../components/MediaCard";
import { fetchMedia } from "../../lib/api";

const Home = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaData = await fetchMedia();
        setMedia(mediaData);
        setTimeout(() => setLoading(false), 2000);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-white ">
      <ScrollView>
        <View className="h-full w-full my-5 flex flex-col  ">
          {media.map((doc, index) => (
            <MediaCard
              key={index}
              caption={doc.caption}
              type={doc.type}
              url={doc.Url}
              mediaId={doc._id}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
