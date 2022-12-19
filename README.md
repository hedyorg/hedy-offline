# Hedy-Offline

Hedy-Offline is an offline version of the gradual programming language [Hedy](https://www.hedycode.com/). This version allows people to use Hedy even when they have a poor or unreliable internet connection, making it especially useful in developing countries.

Hedy-Offline is built using [Electron](https://www.electronjs.org/) and [Next.js](https://nextjs.org/), and includes a bundled version of the [Hedy codebase](https://github.com/hedyorg/hedy) as well as a local Python virtual environment. When the app is launched, the Hedy server is started on a local host and the app connects to this local server as if it were the live Hedy server.

Please note that not all features of Hedy may be available in Hedy-Offline. However, we strive to include as many of the original features as possible.

## Development

To get started with development, follow these steps:

```bash
git clone https://github.com/moesmoesie/hedy-offline.git
yarn install
cd ./apps/electron
python3.7 -m venv venv

# Windows
venv\Scripts\activate.bat

# Unix or Linux
source venv/bin/activate

pip install -r ./hedy/requirements.txt
yarn dev #from root
```

This will start the development server and allow you to view and work on the code locally. Note that the command to activate the virtual environment may vary depending on your operating system and make sure that `python3.7` is in your system's path.

## Downloading Hedy-Offline

To download the latest release of Hedy-Offline, visit the [release page](https://github.com/moesmoesie/hedy-offline/releases). From there, you can download the executable. Please note that the current release version only works on MacOS.

Once the download is complete, extract the package and run the executable to launch Hedy-Offline.

## Contribute

If you're interested in contributing to the development of Hedy-Offline, we'd love to have your help! Here are some ways you can contribute:

- Report bugs or issues you encounter while using Hedy-Offline.
- Suggest new features or improvements to existing features.
- Help with documentation, including updating the README and creating guides for users.
- Write code to fix bugs or implement new features.

To get started, please create a GitHub account and fork the Hedy-Offline repository. Once you've made your changes, submit a pull request and we'll review your contribution.

Thank you for considering contributing to Hedy-Offline! Your help is greatly appreciated.

## Support

If you're having trouble using Hedy-Offline, please file an issue on our issue tracker. We'll do our best to help you out.

## Multiplatform support

Since Hedy Offline has been built with TypeScript and React as its core technologies, many of its main components can work in different platform environments. In the `apps/website` folder, you can find an example of the editor being implemented in a Next.js website. However, this is not the only platform that Hedy Offline can support. In the future, it could also be possible to use tools like [Capacitor](https://capacitorjs.com/) to bring Hedy Offline to mobile platforms.

## Known Issues

There are currently three major known issues with Hedy Offline:

- Lack of syntax highlighting
- The first time loading the app may take long (15 seconds). Some developers who have built electron apps have reported similar experiences online. However, subsequent loads should be faster.
- CORS errors when using the website version of the editor to contact the Hedy API

A workaround for the CORS error is to use a Chrome plugin like [Moesif](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc?hl=nl), but this is not ideal because it requires the user to download a plugin and introduces security risks. The ideal solution would be for the Core Hedy Team to give the Hedy Offline URL permission to use the API without encountering CORS errors.

## Additional information

Hedy-Offline was originally created by [Mustafa Darwesh](https://github.com/moesmoesie) as a thesis project under the supervision of [Felienne Hermans](https://github.com/Felienne) and [Giulio Barbero](https://www.universiteitleiden.nl/en/staffmembers/giulio-barbero#tab-1) with the aim of making Hedy more accessible in developing countries with poor internet connectivity. The project's goal was to allow people in these regions to access and use Hedy even when their internet connection was unreliable or non-existent.
