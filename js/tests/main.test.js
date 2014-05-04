// Jasmine tests on Calculator module for the 'Your listed adverts' table 
// (Sample test, no correct logic in place)
describe("managedAdsCalculator", function() {
	var managedAdsCalculatorTester = BARDIS.managedAdsCalculator;

	beforeEach(function() {
		spyOn(managedAdsCalculatorTester, 'init').andCallThrough();
	});

	afterEach(function() {
		managedAdsCalculatorTester.reset();
	});

	it("should be able to initialize", function() {
		expect(managedAdsCalculatorTester.init).toBeDefined();
		managedAdsCalculatorTester.init();
		expect(managedAdsCalculatorTester.init).toHaveBeenCalled();
	});

	it("should initialise total cost during initialization", function() {
		managedAdsCalculatorTester.init();
		expect(managedAdsCalculatorTester.totalCost).toEqual(0);
	});
	
	// can insert additional tests here later
});