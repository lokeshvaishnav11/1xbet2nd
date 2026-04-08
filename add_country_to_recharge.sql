-- Migration to add country column to recharge table
-- This allows tracking whether the recharge is from India (IN) or Pakistan (PK)

-- Add country column to recharge table
ALTER TABLE `recharge` 
ADD COLUMN `country` VARCHAR(10) NOT NULL DEFAULT 'IN' AFTER `time`;

-- Add index for country column for better query performance
ALTER TABLE `recharge` 
ADD INDEX `idx_country` (`country`);

-- Update existing records to have 'IN' as default country
UPDATE `recharge` SET `country` = 'IN' WHERE `country` = '' OR `country` IS NULL;
