# Easy Interview

Hackathon project, for easier interview and better FreeWheel!

### Member

- Hua Shao (PM & QA)
- Qinting Han (PM & QA)
- Zhongkai Zhao (DEV)
- Xu Hu (DEV)

### Tech

Mainly written in Javascript, powered by [Expressjs][1], [Reactjs][2] and [Redux][3], and use [Semantic UI][4] for UI framework.

### Dependency

1. Nodejs (v4.0 or higher)
2. Browser which supports HTML5

### Usage

1. First of all, install ```node``` and ```mongodb```, then use ```npm``` to install ```bower``` and ```gulp```.

        brew install node mongodb
        npm install bower gulp -g

2. Dump this repo and install all dependencies.

        git clone https://github.com/MrHuxu/easy-interview easy-interview
        cd easy-interview
        npm install
        cd server/public && bower install

3. Start mongodb as our database. The default port is 27017.

        mongod

4. Use ```gulp``` to watch and start server.

        # under the project directory
        gulp dev

  [1]: http://expressjs.com/
  [2]: http://facebook.github.io/react/
  [3]: http://rackt.org/redux/
  [4]: http://semantic-ui.com/
