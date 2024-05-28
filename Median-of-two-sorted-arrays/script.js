// Function to find the median of two sorted arrays
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    let m = nums1.length;
    let n = nums2.length;
    let imin = 0, imax = m, halfLen = Math.floor((m + n + 1) / 2);

    while (imin <= imax) {
        let i = Math.floor((imin + imax) / 2);
        let j = halfLen - i;

        if (i < m && nums1[i] < nums2[j - 1]) {
            imin = i + 1;
        } else if (i > 0 && nums1[i - 1] > nums2[j]) {
            imax = i - 1;
        } else {
            let maxOfLeft;
            if (i === 0) {
                maxOfLeft = nums2[j - 1];
            } else if (j === 0) {
                maxOfLeft = nums1[i - 1];
            } else {
                maxOfLeft = Math.max(nums1[i - 1], nums2[j - 1]);
            }

            if ((m + n) % 2 === 1) {
                return maxOfLeft;
            }

            let minOfRight;
            if (i === m) {
                minOfRight = nums2[j];
            } else if (j === n) {
                minOfRight = nums1[i];
            } else {
                minOfRight = Math.min(nums1[i], nums2[j]);
            }

            return (maxOfLeft + minOfRight) / 2.0;
        }
    }

    throw new Error("Input arrays are not sorted");
}

// Event listener for form submission
document.getElementById('medianForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    let array1 = document.getElementById('array1').value.split(',').map(Number).filter(n => !isNaN(n));
    let array2 = document.getElementById('array2').value.split(',').map(Number).filter(n => !isNaN(n));

    // Ensure the arrays are sorted
    array1.sort((a, b) => a - b);
    array2.sort((a, b) => a - b);

    // Find median
    let median;
    try {
        median = findMedianSortedArrays(array1, array2);
    } catch (error) {
        median = error.message;
    }

    // Display result
    document.getElementById('result').textContent = `Median: ${median}`;

     // Event listener for reset button
     document.getElementById('resetButton').addEventListener('click', function() {
        // Clear input fields
        document.getElementById('array1').value = '';
        document.getElementById('array2').value = '';

        // Clear result
        document.getElementById('result').textContent = '';
    });
});
