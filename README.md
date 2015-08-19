# Easy Interview

Hackathon project, for easier interview and better FreeWheel!

### Member

- Hua Shao (PM & QA)
- Qinting Han (PM & QA)
- Zhongkai Zhao (DEV)
- Xu Hu (DEV)

### Tech

Mainly written in Javascript, powered by [Nodejs][1] and [Reactjs][2], and use [Bootstrap][3] for UI framework.

### Usage

1. First of all, install ```node``` and ```mongodb```, then use ```npm``` to install ```bower``` and ```gulp```.

        brew install node mongodb
        npm install bower gulp -g
        
2. Dump this repo and install all dependencies.

        git clone https://github.com/MrHuxu/easy-interview easy-interview
        cd easy-interview
        npm install
        cd public && bower install
        
3. Use ```gulp``` to watch and start server.

        # under the project directory
        gulp dev

### Todo

- [ ] [P1] Login/Logout by **Xu**
- [ ] [P1] Create/Edit/Delete Questions by **Xu**
- [ ] [P1] Filter by Team/Owner/Difficurty by **Xu**
- [ ] [P1] Choose Questions and Preview by **Zhongkai**
- [ ] [P1] Print Preview Testing Page by **Zhongkai**


  [1]: https://nodejs.org/
  [2]: http://facebook.github.io/react/
  [3]: http://getbootstrap.com/