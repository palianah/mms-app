// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import InfoMsg  from '../../components/InfoMsg/InfoMsg';
import Translation, { text }  from '../../components/Translation/Translation';
import { ROUTE_HOME } from '../../constants/routes';
import { ICON_STOP } from '../../constants/icons';
import './NotFoundLayout.css';

type Props = {
  history: Object,
  location: Object,
  match: Object,
};


/**
* NotFound Layout
*/
const NotFoundLayout = (props: Props) => (
  <section className="NotFoundLayout">
    <InfoMsg icon={ICON_STOP} msg={text('Message', 'NotFoundLayout')}>
        <p><Link to={ ROUTE_HOME }><Translation name="Back" ns="NotFoundLayout" /></Link></p>
    </InfoMsg>
  </section>
);


export default NotFoundLayout;
