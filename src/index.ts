import axios from "axios";
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/getDetails/:accessToken", async ({ params: { accessToken } }) => {
    console.log({ accessToken });
    if (accessToken) {
      try {
        const { data } = await axios.get(
          "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count,following_count,display_name,profile_deep_link,username,likes_count,video_count",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log(JSON.stringify(data, null, 2));
        return data;
      } catch (error) {
        console.error("Error fetching user details:", error);
        return { error: "Failed to fetch user details", errorDetails: error };
      }
    }
  })
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
