import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ name: "Green Coding Berlin", email: "info@green-coding.berlin" }],
    },
  ],
  from: { name: "Green Coding Berlin Website Enquiry", email: "no-reply@green-coding.berlin" },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});