import _ from 'lodash';
import {
    mount,
    createLocalVue
} from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import {
    QCheckbox,
    QChipsInput,
    QDatetime,
    QDatetimeRange,
    QDialogSelect,
    QField,
    QInput,
    QKnob,
    QOptionGroup,
    QRadio,
    QRange,
    QRating,
    QSearch,
    QSelect,
    QSlider,
    QToggle,
    QUploader,
} from 'quasar';

import FormField from '@/partials/form/FormField';

describe('FormField.vue', function () {

    const localVue = createLocalVue();
    localVue.use(Vuelidate);

    it('should load the proper quasar component', function () {

        // test all wrapped components except QInlineDatetime since it is a functional component
        const quasarComponents = {
            'checkbox': QCheckbox,
            'chips-input': QChipsInput,
            'datetime': QDatetime,
            'datetime-range': QDatetimeRange,
            'dialog-select': QDialogSelect,
            'input': QInput,
            'knob': QKnob,
            'option-group': QOptionGroup,
            'radio': QRadio,
            'range': QRange,
            'rating': QRating,
            'search': QSearch,
            'select': QSelect,
            'slider': QSlider,
            'toggle': QToggle,
            'uploader': QUploader,
        };

        _.forOwn(quasarComponents, (value, key) => {
            const wrapper = mount(FormField, {
                propsData: {
                    type: key,
                    model: '',
                    fieldProps: {
                        validation: {}
                    }
                },
                localVue,
            });

            wrapper.contains(QField).should.be.equals(true);
            wrapper.contains(value).should.be.equals(true);
        });
    });

    it('should have access to methods of quasar components', function () {

        // test all components that have methods
        const quasarComponents = {
            'chips-input': [
                'add',
                'remove',
                'focus',
                'select',
            ],
            'datetime': [
                'open',
                'close',
                'clear',
            ],
            'dialog-select': [
                'pick',
                'close',
            ],
            'inline-datetime': [
                'clear',
                'toggleAmPm'
            ],
            'input': [
                'clear',
                'togglePass',
                'focus',
                'blur',
                'select',
            ],
            'rating': [
                'set'
            ],
            'search': [
                'clear',
                'clearAndFocus',
                'focus',
                'blur',
                'select',
            ],
            'select': [
                'open',
                'close',
            ],
            'uploader': [
                'abort',
                'upload',
            ],
        };

        _.forOwn(quasarComponents, (value, key) => {
            const wrapper = mount(FormField, {
                propsData: {
                    type: key,
                    model: '',
                    fieldProps: {
                        validation: {}
                    }
                },
                localVue,
            });

            _.every(value, _.partial(_.has, wrapper.vm)).should.be.equals(true);
        });
    });
});
