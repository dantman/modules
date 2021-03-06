/**
 * File: Email Credentials
 *
 * Maintainer: - Michiel de Jong <michiel@unhosted.org>
 * Version:    -    0.1.0
 *
 */

RemoteStorage.defineModule('email', function(privClient, pubClient) {
  if(!CredentialsStore) {
    throw new Error('please include utils/credentialsstore.js');
  }

  /**
   * Schema: email/config
   *
   * Credentials configuration for email
   *
   * actor - object:
   *   name - display name to use when sending email
   *   address - sender address when sending email
   * object - object:
   *   objectType - always 'credentials'
   *   imap - object:
   *     host - the imap server to connect to (string)
   *     port - the imap port to connect to (number)
   *     tls - whether to use tls (boolean)
   *     usename - imap username (string)
   *     password - imap password (string)
   *   smtp - object:
   *     host - the smtp server to connect to (string)
   *     port - the smtp port to connect to (number)
   *     tls - whether to use tls (boolean)
   *     usename - smtp username (string)
   *     password - smtp password (string)
   */
  privClient.declareType('config', {
    type: 'object',
    properties: {
      actor: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          address: { type: 'string' },
        },
        required: ['name', 'address']
      },
      object: {
        type: 'object',
        properties: {
          objectType: {type: 'string', 'enum': ['credentials'] },
          imap: {
            type: 'object',
            properties: {
              host: { type: 'string' },
              port: { type: 'number' },
              tls: { type: 'boolean' },
              username: { type: 'string' },
              password: { type: 'string' }
            },
            required: ['host', 'port', 'tls', 'username', 'password']
          },
          smtp: {
            type: 'object',
            properties: {
              host: { type: 'string' },
              port: { type: 'number' },
              tls: { type: 'boolean' },
              username: { type: 'string' },
              password: { type: 'string' }
            },
            required: ['host', 'port', 'tls', 'username', 'password']
          }
        },
        required: ['objectType']
      }
    },
    required: ['actor', 'object']
  });
  return {
    exports: new CredentialsStore('email', privClient)
  };
});
