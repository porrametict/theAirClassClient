<<<<<<< HEAD
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';


Vue.use(Vuetify);


const light_theme = {
    primary: '#FFD600',
    background: colors.yellow.accent4,
}



const dark_theme = {
    primary: '#FFD600',
    background: colors.yellow,
}




export default new Vuetify({
    theme: {
        themes: {
            light: light_theme,
            dark: dark_theme,
        },
    }
});
=======
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);


const light_theme = {
    primary: '#FFD600',
    background: colors.yellow.accent4,
}



const dark_theme = {
    primary: '#FFD600',
    background: colors.yellow,
}



export default new Vuetify({
    theme: {
        themes: {
            light: light_theme,
            dark: dark_theme,
        },
    }
});
>>>>>>> bce56eb2712e1c8c18fee3aba672d7074c017a4a
