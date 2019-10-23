'use strict';

import axios from 'axios';
import * as _ from 'lodash';

import { permission } from '../permissions';
import { command, default_permission, helper } from '../decorators';
import System from './_interface';
import { getOwner, sendMessage } from '../commons';
import { error } from '../helpers/log';
import { adminEndpoint } from '../helpers/socket';

/*
 * !commercial                        - gets an info about alias usage
 * !commercial [duration] [?message]  - run commercial
 */

class Commercial extends System {
  constructor () {
    super();
    this.addWidget('commercial', 'widget-title-commercial', 'fas fa-dollar-sign');
  }

  sockets() {
    adminEndpoint(this.nsp, 'commercial.run', (data) => {
      global.tmi.message({
        message: {
          tags: { username: getOwner() },
          message: '!commercial ' + data.seconds,
        },
        skip: true,
      });
    });
  }

  @command('!commercial')
  @default_permission(permission.CASTERS)
  @helper()
  async main (opts) {
    const parsed = opts.parameters.match(/^([\d]+)? ?(.*)?$/);

    if (_.isNil(parsed)) {
      sendMessage('$sender, something went wrong with !commercial', opts.sender, opts.attr);
    }

    const commercial = {
      duration: !_.isNil(parsed[1]) ? parseInt(parsed[1], 10) : null,
      message: !_.isNil(parsed[2]) ? parsed[2] : null,
    };

    if (_.isNil(commercial.duration)) {
      sendMessage('Usage: !commercial [duration] [optional-message]', opts.sender, opts.attr);
      return;
    }

    const cid = global.oauth.channelId;
    // check if duration is correct (30, 60, 90, 120, 150, 180)
    if (_.includes([30, 60, 90, 120, 150, 180], commercial.duration)) {
      const url = `https://api.twitch.tv/kraken/channels/${cid}/commercial`;

      const token = await global.oauth.botAccessToken;
      if (token === '') {
        return;
      }

      try {
        await axios({
          method: 'post',
          url,
          data: { length: commercial.duration },
          headers: {
            'Authorization': 'OAuth ' + token,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Content-Type': 'application/json',
          },
        });

        global.events.fire('commercial', { duration: commercial.duration });
        global.client.commercial(await global.oauth.broadcasterUsername, commercial.duration);
        if (!_.isNil(commercial.message)) {
          sendMessage(commercial.message, opts.sender, opts.attr);
        }
      } catch (e) {
        error(`API: ${url} - ${e.stack}`);
        if (global.panel && global.panel.io) {
          global.panel.io.emit('api.stats', { timestamp: Date.now(), call: 'commercial', api: 'kraken', endpoint: url, code: e.response.status, data: e.stack });
        }
      }
    } else {
      sendMessage('$sender, available commercial duration are: 30, 60, 90, 120, 150 and 180', opts.sender, opts.attr);
    }
  }
}

export default Commercial;
export { Commercial };
