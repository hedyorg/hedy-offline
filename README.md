# Hedy-Offline

Hedy-Offline is an offline version of the gradual programming language [Hedy](https://www.hedycode.com/). This version allows people to use Hedy even when they have a poor or unreliable internet connection, making it especially useful in developing countries.

Hedy-Offline is built using [Electron](https://www.electronjs.org/) and [React](https://reactjs.org/), and includes a bundled version of the [Hedy codebase](https://github.com/hedyorg/hedy) as well as a local Python virtual environment. When the app is launched, the Hedy server is started on a local host and the app connects to this local server as if it were the live Hedy server.

Please note that not all features of Hedy may be available in Hedy-Offline. However, we strive to include as many of the original features as possible.

## Development

To get started with development, follow these steps:

```bash
git clone https://github.com/moesmoesie/hedy-offline.git
yarn install
python3.7 -m venv venv

# Windows
venv\Scripts\activate.bat

# Unix or Linux
source venv/bin/activate

pip install -r ./hedy/requirements.txt
yarn start
```

This will start the development server and allow you to view and work on the code locally. Note that the command to activate the virtual environment may vary depending on your operating system and make sure that `python3.7` is in your system's path.


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

## Additional information
Hedy-Offline was originally created by [Mustafa Darwesh](https://github.com/moesmoesie) as a thesis project under the supervision of [Felienne Hermans](https://github.com/Felienne) and [Giulio Barbero](https://www.universiteitleiden.nl/en/staffmembers/giulio-barbero#tab-1) with the aim of making Hedy more accessible in developing countries with poor internet connectivity. The project's goal was to allow people in these regions to access and use Hedy even when their internet connection was unreliable or non-existent.
