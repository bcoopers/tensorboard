/* Copyright 2018 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
var tf_data_selector;
(function (tf_data_selector) {
    var assert = chai.assert;
    describe('storageUtils', function () {
        describe('decodeIdArray', function () {
            it('decodes list of ids from a string', function () {
                var actual = tf_data_selector.decodeIdArray('1,2,3,2s');
                assert.deepEqual(actual, [1, 2, 3, 100]);
            });
            it('ignores stringified float', function () {
                var actual = tf_data_selector.decodeIdArray('1.weeeeeeeee');
                assert.deepEqual(actual, [1]);
            });
            // TODO(@stephanwlee): This test fails:
            // expected [ 1, 2, 1461559270678 ] to deeply equal [ NaN, 1, 2, NaN, Infinity ]
            it.skip('decodes with unexpected string', function () {
                var actual = tf_data_selector.decodeIdArray(',1, 2,!a,Infinity');
                assert.deepEqual(actual, [NaN, 1, 2, NaN, Infinity]);
            });
        });
        // TODO(#1625): This behavior is implementation-defined. The expected
        // values are accurate for some versions of Chrome/Chromium, but not
        // all.
        describe.skip('encodeIdArray', function () {
            it('encodes list of ids', function () {
                var actual = tf_data_selector.encodeIdArray([1, 2, 3, 100]);
                assert.equal(actual, '1,2,3,2s');
            });
            it('behaves ok for floats', function () {
                var actual = tf_data_selector.encodeIdArray([1, 1.9]);
                assert.equal(actual, '1,1.weeeeeeeee');
            });
            it('behaves ok with large numbers', function () {
                var actual = tf_data_selector.encodeIdArray([-Infinity, Infinity]);
                assert.equal(actual, '-Infinity,Infinity');
            });
        });
    });
})(tf_data_selector || (tf_data_selector = {})); // namespace tf_data_selector
