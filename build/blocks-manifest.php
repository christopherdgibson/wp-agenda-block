<?php
// This file is generated. Do not modify it manually.
return array(
	'meetings-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/meetings-block',
		'version' => '0.1.0',
		'title' => 'Meetings Block',
		'category' => 'widgets',
		'icon' => 'calendar',
		'description' => 'Block for adding meetings and their descriptions.',
		'attributes' => array(
			'meetings' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'meetingsBgColor' => array(
				'type' => 'string',
				'default' => '#82c1f2'
			),
			'meetingsFontColor' => array(
				'type' => 'string',
				'default' => '#0d3ca1'
			),
			'meetingsDividerColorLeft' => array(
				'type' => 'string',
				'default' => '#0000FF'
			),
			'meetingsDividerColorRight' => array(
				'type' => 'string',
				'default' => '#FFA500'
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'usesContext' => array(
			
		),
		'render' => 'file:./render.php',
		'textdomain' => 'meetings-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
