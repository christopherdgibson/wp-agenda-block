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
        --grad-color-left: <?php echo esc_attr($divider_left); ?>;
        --grad-color-right: <?php echo esc_attr($divider_right); ?>;
    ">
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
                        <div class="card card-large meeting-description" data-index="<?php echo $i; ?>" data-sub-index="<?php echo $j; ?>">
                            <button class="close-popup">
                                X
                            </button>
                            <div class="meeting-header"> <?php echo esc_html($sub['header'] ?? ''); ?></div>
                            <div class="meeting-icon">
                                <i class="fa-thin fa-calendar"></i>
                            </div>
                            <div class="content">
                                <p>
                                    <?php echo esc_html($sub['description'] ?? ''); ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php elseif (count($meeting['subMeetings']) == 1) : ?>
                    <?php $sub = $meeting['subMeetings'][0]; ?>
                    <div class="card card-large meeting-description" data-index="<?php echo $i; ?>">
                        <button class="close-popup">
                            X
                        </button>
                        <div class="meeting-header"> <?php echo esc_html($sub['header'] ?? ''); ?></div>
                        <div class="meeting-icon">
                            <i class="fa-thin fa-calendar"></i>
                        </div>
                        <div class="content">
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

<pre><?php print_r($attributes['meetings']); ?></pre>
