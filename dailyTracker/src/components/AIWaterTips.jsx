import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Alert,
  CircularProgress,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  TipsAndUpdates,
  WaterDrop,
  Schedule,
  Favorite,
  Refresh,
  Lightbulb
} from '@mui/icons-material';

const AIWaterTips = ({ intakeWaterHistoryData, targetWater = 2500 }) => {
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastAnalyzed, setLastAnalyzed] = useState(null);

  // Auto-analyze when data changes significantly
  useEffect(() => {
    if (intakeWaterHistoryData && intakeWaterHistoryData.length > 0) {
      if (!lastAnalyzed || intakeWaterHistoryData.length !== lastAnalyzed) {
        analyzeTips();
        setLastAnalyzed(intakeWaterHistoryData.length);
      }
    }
  }, [intakeWaterHistoryData]);

  const analyzeTips = async () => {
    if (!intakeWaterHistoryData || intakeWaterHistoryData.length === 0) {
      setError('No intake data available for analysis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const currentDateTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const response = await fetch('/api/analyzeWaterTips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intakeWaterHistoryData,
          targetWater,
          currentDateTime
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const tipsData = await response.json();
      console.log('🤖 AI Tips received:', tipsData);
      setTips(tipsData);

    } catch (err) {
      console.error('Tips analysis error:', err);
      setError('Unable to generate tips. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getHydrationColor = (status) => {
    const colors = {
      excellent: '#4caf50',
      good: '#8bc34a', 
      needs_improvement: '#ff9800',
      dehydrated: '#f44336'
    };
    return colors[status] || '#757575';
  };

  const getHydrationIcon = (status) => {
    switch (status) {
      case 'excellent': return '💧';
      case 'good': return '✅';
      case 'needs_improvement': return '⚠️';
      case 'dehydrated': return '🚨';
      default: return '💧';
    }
  };

  if (loading) {
    return (
      <Card sx={{ minWidth: 275, borderRadius: 4, mt: 2 }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#00bcd4', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            🤖 Analyzing Your Hydration Pattern...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI is reviewing your intake data to provide personalized tips
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      minWidth: 275, 
      borderRadius: 4, 
      mt: 2,
      borderLeft: '4px solid #00bcd4',
      background: 'rgba(0, 188, 212, 0.05)'
    }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <TipsAndUpdates sx={{ color: '#00bcd4', mr: 1 }} />
            <Typography variant="h6" component="h2">
              🤖 AI Hydration Coach
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={analyzeTips}
            disabled={loading}
            sx={{ color: '#00bcd4' }}
          >
            Refresh
          </Button>
        </Box>

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!tips && !error && (
          <Box textAlign="center" py={2}>
            <Typography variant="body2" color="text.secondary">
              Start tracking your water intake to get personalized AI tips!
            </Typography>
            <Button 
              variant="outlined" 
              onClick={analyzeTips}
              sx={{ mt: 1, color: '#00bcd4', borderColor: '#00bcd4' }}
            >
              Generate Tips
            </Button>
          </Box>
        )}

        {tips && (
          <>
            {/* Progress & Status */}
            <Box mb={3}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="body2" fontWeight="bold">
                  Daily Progress
                </Typography>
                <Chip
                  label={tips.analysis.hydration_status.toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: getHydrationColor(tips.analysis.hydration_status),
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  icon={<span>{getHydrationIcon(tips.analysis.hydration_status)}</span>}
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(tips.analysis.progress_percentage, 100)} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getHydrationColor(tips.analysis.hydration_status)
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {tips.analysis.progress_percentage}% of daily goal • Pattern: {tips.analysis.drinking_pattern}
              </Typography>
            </Box>

            {/* Tips */}
            {tips.tips && tips.tips.length > 0 && (
              <Box mb={3}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                  💡 Personalized Tips
                </Typography>
                <List dense>
                  {tips.tips.map((tip, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <WaterDrop sx={{ color: '#00bcd4', fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={tip}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Next Steps */}
            {tips.recommendations && (
              <Alert 
                severity="info" 
                sx={{ mb: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)' }}
                icon={<Schedule />}
              >
                <Typography variant="body2" fontWeight="bold">
                  {tips.recommendations.next_intake_suggestion}
                </Typography>
                <Typography variant="caption">
                  {tips.recommendations.motivation_message}
                </Typography>
              </Alert>
            )}

            {/* Footer */}
            <Box mt={2} textAlign="center">
              <Typography variant="caption" color="text.secondary">
                AI analysis • {tips.data_points} records • 
                {new Date(tips.generated_at).toLocaleTimeString()}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIWaterTips;
