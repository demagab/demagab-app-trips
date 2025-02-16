import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TripComponent } from '@app/components/trip-detail/trip/trip.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Co2Pipe } from '@app/pipes/co2.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Rating } from 'primeng/rating';
import { Tag } from 'primeng/tag';
import { VerticalType } from '@app/enum/vertical-type.enum';

export default {
    title: 'Components/Trip',
    component: TripComponent,
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                FormsModule,
                Rating,
                ProgressSpinner,
                Tag,
                TranslateModule,
                Co2Pipe
            ]
        })
    ],
    argTypes: {
        trip: { control: 'object' },
        loading: { control: 'boolean' },
        hasError: { control: 'boolean' },
    },
    render: (args: TripComponent) => ({
        props: args,
    })
} as Meta<TripComponent>;

type TripComponentStory = StoryObj<TripComponent>;

export const Default: TripComponentStory = {
    args: {
        trip: {
            id: 'tripId',
            title: 'tripTitle',
            description: 'tripDescription',
            price: 9999.99,
            rating: 4.5,
            numberOfRatings: 1000,
            verticalType: VerticalType.car,
            tags: [],
            co2Emission: 950,
            thumbnailUrl: '',
            imageUrl: '',
            creationDate: new Date(2025,0,1)
        },
        loading: false,
        hasError: false,
    }
};

export const LoadingState: TripComponentStory = {
    args: {
        trip: null,
        loading: true,
        hasError: false,
    }
};

export const ErrorState: TripComponentStory = {
    args: {
        trip: null,
        loading: false,
        hasError: true,
    }
};
