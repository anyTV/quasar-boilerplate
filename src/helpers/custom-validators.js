'use strict';

import _ from 'lodash';
import moment from 'moment';
import dateConfig from 'src/config/date';

// Date validator with strict formatting rule to prevent falling back to js Date validation
// which is not reliable accross browsers
// https://momentjs.com/guides/#/warnings/js-date/
export const isValidStrictDateFormat = value => {
    if (!value) {
        return false;
    }

    return moment(value, dateConfig.formats.ISO_DATE, true).isValid();
};
