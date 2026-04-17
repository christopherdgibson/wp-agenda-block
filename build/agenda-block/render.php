<?php
$meetings = $attributes['meetings'] ?? [];
$bg_color = $attributes['meetingsBgColor'] ?? '#ffffff';
$font_color = $attributes['meetingsFontColor'] ?? '#000000';
$divider_left = $attributes['meetingsDividerColorLeft'] ?? '#000000';
$divider_right = $attributes['meetingsDividerColorRight'] ?? '#000000';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>

    <div class="meetings" style="
        --meetings_description_bl: <?php echo esc_attr($bg_color); ?>;
        --meetings-font-color: <?php echo esc_attr($font_color); ?>;
        --accent-primary: <?php echo esc_attr($divider_left); ?>;
        --accent-secondary: <?php echo esc_attr($divider_right); ?>;
    ">
    <svg width="0" height="0" style="position: absolute">
        <defs>
            <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="<?php echo esc_attr($divider_left); ?>" />
                <stop offset="100%" stop-color="<?php echo esc_attr($divider_right); ?>" />
            </linearGradient>
        </defs>
    </svg>
        <div class="meeting-button-column">
            <?php foreach ($meetings as $i => $meeting) : ?>
                <?php if (count($meeting['subMeetings']) > 1) : ?>
                    <button class="card card-small" data-index="<?php echo $i; ?>" style="position: relative;">
                        <div class="meeting-header">
                            <?php echo esc_html($meeting['supHeader'] ?? ''); ?>
                        </div>
                        <div class="meeting-title container-two">
                            <?php foreach ($meeting['subMeetings'] as $j => $sub) : ?>
                                <?php if (isset($sub['title'])) : ?>
                                    <div>
                                        <a class="card card-part" href="#" data-index="<?php echo $i; ?>" data-sub-index="<?php echo $j; ?>">
                                            <div class="meeting-header">
                                                <?php echo esc_html($sub['header'] ?? ''); ?>
                                            </div>
                                            <div class="meeting-title">
                                                <?php echo esc_html($sub['title'] ?? ''); ?>
                                            </div>
                                        </a>
                                    </div>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                    </button>
                <?php elseif (count($meeting['subMeetings']) == 1) : ?>
                    <?php $sub = $meeting['subMeetings'][0]; ?>
                    <?php if (isset($sub['title'])) : ?>
                        <button class="card card-small" data-index="<?php echo $i; ?>" style="position: relative;">
                            <div class="meeting-header">
                                <?php echo esc_html($sub['header'] ?? ''); ?>
                            </div>
                            <div class="meeting-title">
                                <?php echo esc_html($sub['title'] ?? ''); ?>
                            </div>
                         </button>
                    <?php endif; ?>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>

        <div id="meeting-description-container" class="meeting-description-container">
            <?php foreach ($meetings as $i => $meeting) : ?>
                <?php if (count($meeting['subMeetings']) > 1) : ?>
                    <?php foreach ($meeting['subMeetings'] as $j => $sub) : ?>
                        <div class="card card-large card-description" data-index="<?php echo $i; ?>" data-sub-index="<?php echo $j; ?>">
                            <button class="close-popup">
                                X
                            </button>
                            <div class="meeting-header"> <?php echo esc_html($sub['header'] ?? ''); ?></div>
                            <div class="meeting-icon">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="url(#iconGrad)">
                                        <path d="M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z" />
                                        <path d="M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z" />
                                        <path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                                        <path d="M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z" />
                                        <path d="M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z" />
                                    </g>
                                </svg>
                            </div>
                            <div class="meeting-description">
                                <p>
                                    <?php echo esc_html($sub['description'] ?? ''); ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php elseif (count($meeting['subMeetings']) == 1) : ?>
                    <?php $sub = $meeting['subMeetings'][0]; ?>
                    <div class="card card-large card-description" data-index="<?php echo $i; ?>">
                        <button class="close-popup">
                            X
                        </button>
                        <div class="meeting-header"> <?php echo esc_html($sub['header'] ?? ''); ?></div>
                        <div class="meeting-icon">
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <g fill="url(#iconGrad)">
                                    <path d="M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z" />
                                    <path d="M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z" />
                                    <path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                                    <path d="M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z" />
                                    <path d="M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z" />
                                </g>
                            </svg>
                        </div>
                        <div class="meeting-description">
                            <p>
                                <?php echo esc_html($sub['description'] ?? ''); ?>
                            </p>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>

    </div>
</div>

<!-- <pre><?php print_r($attributes['meetings']); ?></pre> -->
