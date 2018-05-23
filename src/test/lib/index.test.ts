import {assert} from 'chai';
import { convertNpmVersion } from '../../lib';
import { ERROR_CODES } from '../../lib/custom-error';

describe('lib tests', function(this: any) {
  this.timeout(20000);

  it('#convertNpmVersion failure cases', () => {
    assert.throws(() => {
      convertNpmVersion('noatsign');
    });
    assert.throws(() => {
      convertNpmVersion('dummy@latest~notanumber');
    });
    assert.throws(() => {
      try {
        convertNpmVersion('unknownpackage34@latest~1');  
      } catch (error) {
        assert.equal(error.code, ERROR_CODES.NPM_SPAWN_ERROR);
        throw error;
      }      
    });
    assert.throws(() => {
      try {
        convertNpmVersion('babel@notag~1');  
      } catch (error) {
        assert.equal(error.code, ERROR_CODES.TAG_NOT_FOUND);
        throw error;
      }      
    });
  });

  it('#convertNpmVersion success', () => {
    //babel is deprecated so these versions should be stable
    //see: https://www.npmjs.com/package/babel?activeTab=versions    
    assert.equal(convertNpmVersion('babel@old'), 'babel@5.8.38');    
    assert.equal(convertNpmVersion('babel@old~1'), 'babel@5.8.35');
    assert.equal(convertNpmVersion('babel@latest'), 'babel@6.23.0');
    assert.equal(convertNpmVersion('babel@latest~1'), 'babel@6.5.2');
    assert.equal(convertNpmVersion('babel@latest~4'), 'babel@6.3.26');
    assert.equal(convertNpmVersion('babel@latest~4', true), 'babel@6.5.0-1');
    assert.equal(convertNpmVersion('babel@latest~5', true), 'babel@6.3.26');
  });
});
