<?php
// This file is generated. Do not modify it manually.
return array(
	'agenda-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/agenda-block',
		'version' => '0.1.0',
		'author' => 'Christopher D Gibson',
		'authorURI' => 'https://christopherdgibson.github.io',
		'license' => 'GPL-2.0-or-later',
		'licenseURI' => 'https://www.gnu.org/licenses/gpl-2.0.html',
		'title' => 'Agenda Block',
		'category' => 'widgets',
		'icon' => 'calendar',
		'description' => 'Block for adding agenda items and their descriptions.',
		'attributes' => array(
			'meetings' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'meetingsBgColor' => array(
				'type' => 'string',
				'default' => '#e3e3e3'
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
		'textdomain' => 'agenda-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
