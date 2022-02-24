<template>
    <div class="full-width row wrap justify-center items-start">
        <div class="history-container">
            <f-history 
                :history="history_sample"
                :status-types="status_types"
            />
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import claim_status from 'src/data/claim-history-types.json';
    import user_status from 'src/data/user-status-types.json';

    export default {
        name : 'FHistoryDemo',
        data () {
            return {
                status_types: _.merge(claim_status, user_status),
                history_sample: {
                    items: [
                        {
                            id: 0,
                            reviewerId: 531,
                            notes: 'Updated application',
                            createdAt: '2021-08-27T22:26:52.000Z',
                            status: 'pending',
                            reviewerName: 'John Doe'
                        },
                        {
                            id: 1,
                            reviewerId: 531,
                            notes: 'Updated application',
                            createdAt: '2021-08-25T22:29:52.000Z',
                            status: 'accepted',
                            reviewerName: 'John Doe'
                        },
                        {
                            id: 2,
                            reviewerId: 531,
                            notes: 'Test by jonel',
                            status: 'resubmitted',
                            createdAt: '2021-02-18T05:03:04.000Z',
                            reviewerName: 'John Doe'
                        },
                        {
                            id: 3,
                            reviewerId: 531,
                            notes: 'Lorem amet consectetur adipisicing elit. Ullam possimus reiciendis nam dolor quia! Quidem, unde. orem amet consectetur adipisicing elit. Ullam possimus reiciendis nam dolor quia! Quidem, unde.',
                            status: 'rejected',
                            createdAt: '2021-02-16T10:03:04.000Z',
                            reviewerName: 'John Doe'
                        },
                        {
                            id: 4,
                            reviewerId: 531,
                            notes: 'sit amet consectetur adipisicing elit. Ullam possimus reiciendis nam dol orem amet consectetur adipisicing elit. Ullam possimus reiciendis nam dolor quia! Quidem, unde.orem amet consectetur adipisicing elit. Ullam possimus reiciendis nam dolor quia! Quidem, unde.',
                            status: 'escalated',
                            createdAt: '2021-02-16T09:05:04.000Z',
                            reviewerName: 'John Doe'
                        },
                        {
                            id: 5,
                            reviewerId: 531,
                            notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam possimus reiciendis nam dolor quia! Quidem, unde.',
                            status: 'cancelled',
                            createdAt: '2021-02-16T09:03:04.000Z',
                            reviewerName: 'John Doe'
                        },
                        {
                            id: 6,
                            reviewerId: 531,
                            notes: 'Lorem ipsum dolor sit amet .',
                            status: 'banned',
                            createdAt: '2021-02-16T08:13:04.000Z',
                            reviewerName: 'John Doe'
                        },
                        {
                            id: 7,
                            reviewerId: 531,
                            notes: 'Ullam possimus reiciendis nam dolor quia! Quidem, unde. orem amet consectetur adipisicing elit. Ullam possimus reiciendis nam dolor quia! Quidem, unde.orem amet consectetur adipisicing elit. Ullam possimus reiciendis nam dolor quia! Quidem, unde.',
                            status: 'under_verification',
                            createdAt: '2021-02-16T07:03:04.000Z',
                            reviewerName: 'John Doe'
                        },
                        {
                            claimId: "zZWUYz95",
                            createdAt: "2020-11-01T17:32:42.000Z",
                            status: "claim-created"
                        },
                        {
                            claimId: "R93HZYRR",
                            createdAt: "2020-10-01T14:30:42.000Z",
                            status: "release"
                        },
                        {
                            claimId: "nkGWV67a",
                            createdAt: "2020-09-15T10:32:42.000Z",
                            status: "update"
                        },
                    ],
                    total: 11
                }
            };
        },
    };
</script>

<style lang="stylus" scoped>
.history-container
    width: 650px
</style>
