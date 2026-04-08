// Add country code selector to register popup phone field
(function() {
    'use strict';
    
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        const phoneInput = document.getElementById('registerPhone');
        
        if (phoneInput) {
            // Get parent container
            const parentDiv = phoneInput.parentElement;
            
            // Check if already added
            if (document.getElementById('registerCountryCode')) {
                return;
            }
            
            // Set parent to flex layout
            parentDiv.style.display = 'flex';
            parentDiv.style.gap = '8px';
            parentDiv.style.alignItems = 'center';
            
            // Create country code selector
            const select = document.createElement('select');
            select.id = 'registerCountryCode';
            select.style.cssText = `
                padding: 10px 32px 10px 10px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background: #fff;
                color: #333;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3e%3cpolyline points=%226 9 12 15 18 9%22%3e%3c/polyline%3e%3c/svg%3e');
                background-repeat: no-repeat;
                background-position: right 8px center;
                background-size: 16px;
                min-width: 130px;
                height: 42px;
            `;
            
            // Add options
            const indiaOption = document.createElement('option');
            indiaOption.value = '+91';
            indiaOption.textContent = '🇮🇳 +91';
            indiaOption.selected = true;
            
            const pakistanOption = document.createElement('option');
            pakistanOption.value = '+92';
            pakistanOption.textContent = '🇵🇰 +92';
            
            select.appendChild(indiaOption);
            select.appendChild(pakistanOption);
            
            // Insert before phone input
            parentDiv.insertBefore(select, phoneInput);
            
            // Make phone input flexible
            phoneInput.style.flex = '1';
            
            console.log('✅ Country code selector added to register popup');
        }
    });
    
    // Function to get full phone number with country code
    window.getFullPhoneNumber = function() {
        const countryCode = document.getElementById('registerCountryCode');
        const phoneNumber = document.getElementById('registerPhone');
        
        if (countryCode && phoneNumber) {
            return countryCode.value + phoneNumber.value;
        }
        return phoneNumber ? phoneNumber.value : '';
    };
    
})();
