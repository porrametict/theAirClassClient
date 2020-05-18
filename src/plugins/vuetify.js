import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);
const theme = {
    primary: '#FFD600',
    secondary: '#9C27b0',
    accent: '#9C27b0',
    info: '#00CAE3',
    success : colors.green.darken1,
    danger : colors.red.darken2
}
export default new Vuetify({
    theme: {
        themes : {
            light : theme
        }

    }
});