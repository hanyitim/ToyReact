const path = require('path');
module.exports = {
    entry:{
        main:path.join(__dirname,'./main.js')
    },
    output:{
        path:path.join(__dirname,'/dist')
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/.js/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env'],
                            plugins:[['@babel/plugin-transform-react-jsx',{pragma:'createElement'}]]
                        }
                    }
                ]
            }
        ]
    },
    optimization:{
        minimize:false
    }
};