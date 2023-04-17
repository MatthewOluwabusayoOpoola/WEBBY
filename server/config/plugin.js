module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: "_uaNWtw1j8OyiS32V-ay4wsQSSkfxh94SHJy7u8SKcE",
      sites: [
        {
          name: "Site 1",
          id: "46255c53-798a-42a1-b722-fecd012e4a7d",
          buildHook: "https://api.netlify.com/build_hooks/<hook_id>",
          branch: "master", // optional
        },
      ],
    },
  },
});
