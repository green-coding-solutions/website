import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ name: "Green Coding Berlin", email: "info@green-coding.berlin" }],
    },
  ],
  from: { name: "Green Coding Berlin Website Enquiry", email: "no-reply@green-coding.berlin" },
  respondWith: () => {
    return new Response(
      `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
    );
  },
});