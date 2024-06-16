ALTER TABLE `invitation` ADD `token` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `inv_token_idx` ON `invitation` (`token`);--> statement-breakpoint
ALTER TABLE `invitation` DROP COLUMN `field`;