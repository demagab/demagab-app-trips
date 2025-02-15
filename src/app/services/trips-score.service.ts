export class TripsScoreService {
    static calculateScore(
        rating: number,
        numberOfRatings: number,
        co2Emission: number,
      ): number {
        return Math.floor(
          ((15 + rating * numberOfRatings) / (5 + numberOfRatings) -
            co2Emission / 1000) /
            2,
        );
      }

      static getSeverity(rating: number): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
        return rating > 1 ? 'success' : rating > 0 ? 'warn' : 'secondary';
      }
    
      static getScoreTranslationKey(rating: number): string {
        return rating > 1 ? 'content.score-values.awesome' : rating > 0 ? 'content.score-values.good' : 'content.score-values.average';
      }
}